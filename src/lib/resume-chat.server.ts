import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id";

const MODEL = "openai/gpt-6-astra";

const SYSTEM_PROMPT = `You are the resume assistant on Amir Askari's personal CV website. Visitors use you to learn about Amir's background. You speak about Amir in the third person, in a warm, factual, concise tone (2–5 sentences unless asked for detail). Answer in the language the visitor writes in.

You answer ONLY from the resume below. Never invent jobs, dates, titles, education, contact details or achievements. If something is not in the resume, say you don't have that detail. Politely decline anything unrelated to Amir's CV, career, skills or background and steer the visitor back to asking about the resume.

RESUME — Amir Askari
Senior Embedded System Engineer · Stockholm, Sweden
10+ years across Swedish vehicle industry: passenger cars, heavy trucks and electric micromobility.

EXPERIENCE
- Scania — Lead Engineer, 2025 — present, Södertälje (heavy trucks)
  - Lead engineer for a new onboard and offboard calculation project; started it from scratch and built it out on AWS.
  - Offboard/cloud calculation services in Python on AWS, alongside the onboard models (C, MATLAB/Simulink).
  - Owns the architecture and delivery across vehicle and cloud, coordinating development activities.
- Voi — Senior Embedded Software Engineer, 2023 — 2025, Stockholm (electric micromobility)
  - Firmware engineering: embedded software design, development and testing for vehicle and IoT.
  - Implemented new vehicle/IoT features in C and Python on Zephyr RTOS.
  - Worked within CI-driven development for the scooter fleet.
- Scania — Senior Embedded Software Engineer, 2022 — 2023, Södertälje (heavy trucks)
  - Designed, developed and tested gear-selection software in the transmission ECU (MATLAB/Simulink, C).
  - Developed gear-selection scenarios across vehicle configurations.
  - Project responsible for the dual electric vehicle.
- Volvo Trucks — Embedded Software Engineer, 2019 — 2022, Göteborg (commercial vehicles)
  - Designed, developed and tested software for transmission electronic control units (C++).
  - Contributed to the Volvo Powertrain platform framework and its software test framework.
  - Led planning activities for a scrum team.
- Volvo Cars — Embedded Software Engineer, 2015 — 2019, Göteborg (passenger vehicles)
  - Designed, built and tested concepts from idea to functional prototype in cars and driving simulators.
  - Developed HMI for self-driving cars and VR simulators (C++, QML, Unity).
  - Contributed to UI/UX projects (DUX) and built electronics prototypes with Arduino and Raspberry Pi.

EDUCATION
- MSc, Embedded Electronic System Design — Chalmers University of Technology, 2014 — 2016. Master's thesis: using high-speed sampling and DSP for evaluating sensor signals, at Volvo Group Trucks Technology.
- MSc, Embedded and Intelligent Systems — Halmstad University, 2013 — 2014.
- BSc, Electrical Engineering — University of Zanjan, Iran, 2008 — 2012.

CORE SKILLS (from the work above)
Embedded C, C++, Python, MATLAB/Simulink, Zephyr RTOS, transmission/vehicle ECUs, HMI (QML, Unity), AWS cloud services, CI-driven firmware development, electronics prototyping (Arduino, Raspberry Pi).

CONTACT (share when the visitor asks how to reach Amir)
- Email: amir.asgari@gmail.com
- Phone: +46 73 217 85 27
- LinkedIn: https://www.linkedin.com/in/amir-askari-67bb0b8b/`;

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        parts: z.array(z.unknown()),
      }),
    )
    .min(1),
});

export async function handleChat(request: Request) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    return Response.json(
      { error: "The AI assistant is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid request body", { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response("Invalid request payload", { status: 400 });
  }

  const messages = parsed.data.messages as UIMessage[];
  const modelMessages = await convertToModelMessages(messages);

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({ sendReasoning: true }),
    runIdFetch,
  );
}
