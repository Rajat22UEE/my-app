#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import axios from "axios";
import chalk from "chalk";
import { fileURLToPath } from "url";

const program = new Command();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the central component registry URL
const REGISTRY_URL = "https://raw.githubusercontent.com/your-repo/yupcha-components/main";

// Function to install a component
const installComponent = async (componentName) => {
  const componentUrl = `${REGISTRY_URL}/${componentName}.tsx`;
  const destinationPath = path.join(process.cwd(), "components/ui", `${componentName}.tsx`);

  console.log(chalk.blue(`Fetching ${componentName} from the registry...`));

  try {
    const { data } = await axios.get(componentUrl);
    await fs.outputFile(destinationPath, data);
    console.log(chalk.green(`✔ Installed "${componentName}" in components/ui/`));
  } catch (error) {
    console.error(chalk.red(`❌ Error: Component "${componentName}" not found.`));
    console.error(chalk.yellow("Make sure the component exists in the registry."));
  }
};

// CLI commands
program
  .command("add <component>")
  .description("Fetch and install a component into your project")
  .action(installComponent);

program.parse(process.argv);
