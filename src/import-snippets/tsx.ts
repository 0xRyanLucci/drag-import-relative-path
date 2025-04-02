import * as vscode from 'vscode';
import * as path from 'path';

import { getFileExt } from '../utilities';
import { FileExtension } from '../model';

// Helper function to convert filename to PascalCase component name
function getSvgComponentName(filePath: string): string {
  // Extract the filename without extension
  const filename = path.basename(filePath, '.svg');
  
  // Convert to PascalCase
  return filename
    .split(/[-_\s]+/) // Split by dashes, underscores, or spaces
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

export function snippet(
  relativePath: string,
  fromFilepath: string
): vscode.SnippetString {
  // Check if the file is an SVG
  if (getFileExt(fromFilepath) === '.svg') {
    const componentName = getSvgComponentName(fromFilepath);
    
    // Return the import with ?react suffix
    return new vscode.SnippetString(`import ${componentName} from '${relativePath + getFileExt(fromFilepath)}?react';`);
  }

  switch (getFileExt(fromFilepath) as FileExtension) {
    case '.gif': // Images
    case '.jpeg':
    case '.jpg':
    case '.png':
    case '.webp':
    case '.json': // Data
    case '.ts': case '.js': // Scripts
    case '.tsx':
    case '.html': // HTML
    case '.yml': // YAML
    case '.yaml':
    case '.md': // MD
    {
      return new vscode.SnippetString(`import name$1 from '${relativePath + getFileExt(fromFilepath)}';`);
    }
    case '.woff': // Fonts
    case '.woff2':
    case '.ttf':
    case '.eot':
    case '.css': // Stylesheets
    case '.scss':
    {
      return new vscode.SnippetString(`import '${relativePath + getFileExt(fromFilepath)}';`);
    }
    default: {
      return new vscode.SnippetString(``);
    }
  }
}