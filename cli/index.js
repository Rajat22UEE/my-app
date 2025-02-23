#!/usr/bin/env node

import { program } from "commander";
import axios from "axios";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const GITHUB_REPO = "Rajat22UEE/yupcha-components";
const BASE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/components/`;

// Fetch Component Function
async function fetchComponent(componentName) {
  const url = `${BASE_URL}${componentName}.tsx`; // Change extension if needed
  const outputPath = path.join(process.cwd(), "components/ui", `${componentName}.tsx`);

  try {
    console.log(chalk.blue(`📥 Fetching ${componentName} from Yupcha Registry...`));
    const { data } = await axios.get(url);

    // Ensure the directory exists
    await fs.ensureDir(path.dirname(outputPath));

    // Write the component file
    await fs.writeFile(outputPath, data);
    console.log(chalk.green(`✅ ${componentName}.tsx downloaded successfully!`));
  } catch (error) {
    console.error(chalk.red(`❌ Failed to fetch ${componentName}: ${error.response?.status === 404 ? "Component not found." : error.message}`));
  }
}

// Setup CLI Commands
program
  .command("install <component>")
  .description("Fetch a UI component from the Yupcha registry")
  .action(fetchComponent);

program.parse(process.argv);
