import type { Meta, StoryObj } from "@storybook/react";
import Greeting from "./Greeting";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof Greeting> = {
  title: "Example/Greeting",
  component: Greeting,
};

export default meta;

type Story = StoryObj<typeof Greeting>;

export const Default: Story = {
  parameters: {
    msw: [
      http.get("http://localhost:5000/greeting", async () => {
        return HttpResponse.json({ greeting: "Hello" });
      }),
    ],
  },
};
