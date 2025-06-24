import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const BIRTHDAY_VIDEO_SCHEMA = z.object({
  name: z.string().default("Alex"),
  primary: zColor().optional(),
  secondary: zColor().optional(),
  accent: zColor().optional(),
});

export const DEFAULT_BIRTHDAY_COLORS = {
  primary: "#7DD3FC",
  secondary: "#FDE68A",
  accent: "#F472B6"
};
