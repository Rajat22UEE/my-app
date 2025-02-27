#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const chalk = require("chalk");

const BUTTON_TEMPLATE = (variant, size) => `
import React from "react";
import { Button } from "../ui/button";

const ${variant.charAt(0).toUpperCase() + variant.slice(1)}${size.charAt(0).toUpperCase() + size.slice(1)}Button = () => {
  return <Button variant="${variant}" size="${size}">Click me</Button>;
};

export default ${variant.charAt(0).toUpperCase() + variant.slice(1)}${size.charAt(0).toUpperCase() + size.slice(1)}Button;
`;

program
  .command("add <variant> <size>")
  .description("Generate a new button component with the specified variant and size")
  .action((variant, size) => {
    const fileName = `${variant}-${size}.jsx`;
    const filePath = path.join(__dirname, "../../registry/example", fileName);

    if (fs.existsSync(filePath)) {
      console.log(chalk.red(`❌ Button ${fileName} already exists.`));
      return;
    }

    fs.writeFileSync(filePath, BUTTON_TEMPLATE(variant, size));
    console.log(chalk.green(`✅ Button ${fileName} created in registry/example/`));
  });

program.parse(process.argv);
