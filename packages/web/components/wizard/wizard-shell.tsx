"use client";

import { useReducer, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  wizardReducer,
  initialState,
  type WizardState,
  type WizardAction,
} from "../../lib/wizard-state";
import { StepProvider } from "./step-provider";
import { StepLlm } from "./step-llm";
import { StepChannel } from "./step-channel";
import { StepCustomize } from "./step-customize";
import { StepDeploy } from "./step-deploy";
import { StepDownload } from "./step-download";
import { StepConnect } from "./step-connect";
import { StepDone } from "./step-done";

export type DispatchWizard = React.Dispatch<WizardAction>;

export function WizardShell() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  useEffect(() => {
    if (!state.deploying) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [state.deploying]);

  const goNext = useCallback(() => {
    dispatch({ type: "SET_STEP", step: state.step + 1 });
  }, [state.step]);

  const goBack = useCallback(() => {
    dispatch({ type: "SET_STEP", step: Math.max(1, state.step - 1) });
  }, [state.step]);

  const currentStep = getCurrentStep(state);
  const canGoNext = currentStep.canNext(state);
  const showBack = state.step > 1;

  return (
    <main className="min-h-screen px-6 py-12 max-w-2xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-foreground font-semibold hover:text-accent-indigo"
        >
          HoldMyClaw
        </Link>
        <span className="text-muted text-sm">
          Step {state.step} of {getTotalSteps(state)}
        </span>
      </div>

      <div className="mb-8">
        <div
          className="h-1 rounded-full bg-border overflow-hidden"
          style={{ width: "100%" }}
        >
          <div
            className="h-full bg-accent-indigo transition-all duration-300"
            style={{
              width: `${(state.step / getTotalSteps(state)) * 100}%`,
            }}
          />
        </div>
      </div>

      {currentStep.component(state, dispatch, goNext, goBack)}

      <div className="mt-8 flex gap-4">
        {showBack && (
          <button
            type="button"
            onClick={goBack}
            className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-code-bg"
          >
            Back
          </button>
        )}
        {currentStep.showNext && !currentStep.hideNextButton && (
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            className="px-4 py-2 rounded-lg bg-accent-indigo text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </main>
  );
}

function getTotalSteps(state: WizardState): number {
  if (state.deployTarget === "local") return 6;
  return 7;
}

interface StepDef {
  component: (
    state: WizardState,
    dispatch: DispatchWizard,
    goNext: () => void,
    goBack: () => void
  ) => React.ReactNode;
  canNext: (state: WizardState) => boolean;
  showNext: boolean;
  hideNextButton?: boolean;
}

function getCurrentStep(state: WizardState): StepDef {
  const steps: Record<number, StepDef> = {
    1: {
      component: (s, d, next, back) => (
        <StepProvider state={s} dispatch={d} onNext={next} onBack={back} />
      ),
      canNext: (s) =>
        s.deployTarget !== null &&
        (s.deployTarget === "local" ||
          (s.cloudProvider !== null && s.providerValidated)),
      showNext: true,
    },
    2: {
      component: (s, d, next, back) => (
        <StepLlm state={s} dispatch={d} onNext={next} onBack={back} />
      ),
      canNext: (s) => s.llmValidated && !!s.llmApiKey.trim(),
      showNext: true,
    },
    3: {
      component: (s, d, next, back) => (
        <StepChannel state={s} dispatch={d} onNext={next} onBack={back} />
      ),
      canNext: (s) =>
        s.channel === "whatsapp" || (s.channelValidated && !!s.channelToken.trim()),
      showNext: true,
    },
    4: {
      component: (s, d, next, back) => (
        <StepCustomize state={s} dispatch={d} onNext={next} onBack={back} />
      ),
      canNext: () => true,
      showNext: true,
    },
    5: {
      component: (s, d, next, back) =>
        s.deployTarget === "local" ? (
          <StepDownload state={s} dispatch={d} onNext={next} onBack={back} />
        ) : (
          <StepDeploy state={s} dispatch={d} onNext={next} onBack={back} />
        ),
      canNext: () => true,
      showNext: true,
      hideNextButton: true,
    },
    6: {
      component: (s, d, next, back) =>
        s.deployTarget === "local" ? (
          <StepDone state={s} dispatch={d} onNext={next} onBack={back} />
        ) : (
          <StepConnect state={s} dispatch={d} onNext={next} onBack={back} />
        ),
      canNext: () => true,
      showNext: true,
    },
    7: {
      component: (s, d, next, back) => (
        <StepDone state={s} dispatch={d} onNext={next} onBack={back} />
      ),
      canNext: () => true,
      showNext: false,
    },
  };

  const total = getTotalSteps(state);
  const step = Math.min(state.step, total);
  return steps[step] ?? steps[1]!;
}
