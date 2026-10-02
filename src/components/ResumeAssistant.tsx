import { useEffect, useMemo, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import assistantMark from "@/assets/assistant-mark.png";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const SUGGESTIONS = [
  "What does Amir do at Scania today?",
  "Which skills does he bring?",
  "Walk me through his education",
];

export function ResumeAssistant() {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );
  const { messages, sendMessage, status, stop, error, clearError } = useChat({
    transport,
  });
  const busy = status === "submitted" || status === "streaming";
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // keep the composer focused through normal use: after send, after the
  // answer finishes streaming, and on first render (autoFocus below).
  useEffect(() => {
    if (status === "ready") {
      textareaRef.current?.focus();
    }
  }, [status, messages.length]);

  const handleSubmit = ({ text }: { text?: string }) => {
    const value = text?.trim();
    if (!value || busy) return;
    void sendMessage({ text: value });
  };

  return (
    <div className="glass flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-border">
      {/* assistant identity */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-3">
        <img
          src={assistantMark}
          alt=""
          width={816}
          height={816}
          loading="lazy"
          className="size-8 drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]"
        />
        <div className="flex-1">
          <div className="font-display text-lg leading-tight tracking-tight">
            Ask my resume
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-faint">
            Answers from this CV only
          </div>
        </div>
        <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
          <span className="glow-pulse size-1.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/70" />
          Live
        </span>
      </div>

      <Conversation className="min-h-0 flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              className="px-8"
              title="Hi — I'm Amir's resume assistant."
              description="Ask me anything about his experience, skills or education. This chat isn't saved anywhere."
            >
              <img
                src={assistantMark}
                alt=""
                width={816}
                height={816}
                loading="lazy"
                className="size-12 drop-shadow-[0_0_14px_rgba(34,211,238,0.35)]"
              />
              <div className="space-y-1">
                <h3 className="font-display text-xl tracking-tight">
                  Hi — I'm Amir's resume assistant.
                </h3>
                <p className="mx-auto max-w-[36ch] text-sm text-muted">
                  Ask anything about his experience, skills or education. This
                  chat isn't saved anywhere.
                </p>
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => void sendMessage({ text: suggestion })}
                    className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent
                  className={
                    message.role === "user"
                      ? "group-[.is-user]:bg-accent group-[.is-user]:text-background"
                      : ""
                  }
                >
                  <MessageResponse>{message.parts}</MessageResponse>
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" ? (
            <Message from="assistant">
              <MessageContent>
                <Shimmer className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Reading the CV…
                </Shimmer>
              </MessageContent>
            </Message>
          ) : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {error ? (
        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-2">
          <p className="text-xs text-foreground/70">
            {error.message || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={clearError}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent hover:text-accent-2"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <PromptInput onSubmit={handleSubmit} className="border-t border-border">
        <PromptInputTextarea
          ref={textareaRef}
          autoFocus
          placeholder={
            busy ? "Assistant is answering…" : "Ask about Amir's experience…"
          }
          rows={2}
        />
        <PromptInputFooter className="justify-end">
          <PromptInputSubmit
            status={status}
            onStop={stop}
            disabled={!busy && false}
          />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
