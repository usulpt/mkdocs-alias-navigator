# MkDocs Alias Navigator

This VS Code extension allows you to navigate MkDocs alias links, complementing the great work by `https://github.com/EddyLuten/mkdocs-alias-plugin`.

## Features

- Navigate to the source file of alias links in markdown files on MkDocs structures.

## Usage

- Define alias links in your markdown files using the `[[alias]]` syntax.
- Place your cursor on the alias link and select `Ctrl+Alt+N` to navigate to the corresponding file.

## Requirements

- VS Code 1.50.0 or higher.

## Extension Settings

This extension contributes the following settings:

- `markdownAliasNavigator.aliasNavigation.folder`: Base MkDocs structure folder.

## Known Issues

- No duplicate aliases must exist in the documentation folder.

## Release Notes

### 0.0.1

Initial release.
