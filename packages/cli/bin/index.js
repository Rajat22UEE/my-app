#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const program = new Command();
const buttonCode = `import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-primary text-white px-4 py-2 rounded-md",
  destructive: "bg-red-500 text-white px-4 py-2 rounded-md",
  outline: "border border-gray-300 px-4 py-2 rounded-md",
  secondary: "bg-gray-500 text-white px-4 py-2 rounded-md",
  ghost: "text-gray-700 px-4 py-2",
  link: "text-blue-500 underline",
};

const Button = ({ variant = "default", className, ...props }) => {
  return (
    <button className={cn(buttonVariants[variant], className)} {...props} />
  );
};

export { Button };
`;

program
  .command("add button")
  .description("Generates components/ui/button.jsx in the user's project")
  .action(() => {
    const targetPath = path.resolve(process.cwd(), "components/ui/button.jsx");

    if (!fs.existsSync(path.dirname(targetPath))) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    }

    fs.writeFileSync(targetPath, buttonCode);
    console.log(chalk.green(`✅ Button component generated at ${targetPath}`));
  });

program.parse(process.argv);
