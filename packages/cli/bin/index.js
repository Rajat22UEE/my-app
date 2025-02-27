#!/usr/bin/env node

import { program } from "commander";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const exampleComponent = `
import { Button } from "@/components/ui/button";

export default function ExampleButton() {
  return (
    <div className="flex gap-4">
      <Button variant="default" size="default">Default</Button>
      <Button variant="destructive" size="lg">Destructive</Button>
      <Button variant="outline" size="sm">Outline</Button>
      <Button variant="secondary" size="icon">Icon</Button>
    </div>
  );
}
`;

program
  .version("1.0.0")
  .description("CLI tool to help you use buttons in your Next.js project");

// Show usage instructions
program
  .command("usage")
  .description("Show how to use the Button component")
  .action(() => {
    console.log(chalk.green("\n📌 Usage of the Button Component:\n"));
    console.log(chalk.blue(`import { Button } from "@/components/ui/button";`));
    console.log(`
Example:
<Button variant="default" size="default">Click Me</Button>

Available Variants: default, destructive, outline, secondary, ghost, link
Available Sizes: default, sm, lg, icon
    `);
    console.log(chalk.yellow("\nRun 'button-cli example' to generate an example component.\n"));
  });

// Generate an example component
program
  .command("example")
  .description("Generate an example button component")
  .action(() => {
    const examplePath = path.join(process.cwd(), "apps/www/registry/default/example/ExampleButton.jsx");
    
    if (fs.existsSync(examplePath)) {
      console.log(chalk.red("⚠️ ExampleButton.jsx already exists!"));
    } else {
      fs.ensureFileSync(examplePath);
      fs.writeFileSync(examplePath, exampleComponent, "utf8");
      console.log(chalk.green(`✅ ExampleButton.jsx created at ${examplePath}`));
    }
  });

program.parse(process.argv);
