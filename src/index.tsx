import "./styles.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

interface ToggleContext {
  count: number;
}

type ToggleEvents = { type: "TOGGLE" };

const toggleMachine = createMachine<ToggleContext, ToggleEvents>({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" }
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" }
    }
  },
  predictableActionArguments: true
});

function App() {
  const [current, send] = useMachine(toggleMachine);
  const active = current.matches("active");
  const { count } = current.context;

  return (
    <div className="App">
      <h1>XState React Template</h1>
      <h2>Fork this template!</h2>
      <button onClick={() => send({ type: "TOGGLE" })}>
        Click me ({active ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{count}</strong> times
      </code>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
