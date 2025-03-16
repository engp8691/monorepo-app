import type { Meta, StoryObj } from "@storybook/react";
import App from "./app";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof App> = {
  title: "Example/App",
  component: App,
};
export default meta;

type Story = StoryObj<typeof App>;

export const Default: Story = {
  parameters: {
    msw: [
      http.get("http://localhost:3000/greeting?username=John'", async () => {
        return HttpResponse.json({
          greeting: "Hello, John!",
        });
      }),
    ],
  },
};
