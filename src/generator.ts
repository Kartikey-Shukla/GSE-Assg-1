
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export const generator = javascriptGenerator;
generator.INDENT = '  ';

// 1. Role Block Generation
// Returns the role as a quoted string, followed by a comma so it can be part of an array.
generator.forBlock['rbac_role'] = function (block: Blockly.Block): string {
  const role = block.getFieldValue('ROLE');
  return `"${role}",\n`;
};

// 2. Resource Block Generation
// Returns the resource as a quoted string, followed by a comma so it can be part of an array.
generator.forBlock['rbac_resource'] = function (block: Blockly.Block): string {
  const res = block.getFieldValue('RES');
  return `"${res}",\n`;
};

// 3. Rule Block Generation
// Builds the 'if' statement checking if the action matches and if the resource is in the allowed list.
generator.forBlock['rbac_rule'] = function (block: Blockly.Block): string {
  const effect = block.getFieldValue('EFFECT'); // "Allow" or "Deny"
  const action = block.getFieldValue('ACTION');
  
  // Recursively collect all attached resource blocks
  const resources = generator.statementToCode(block, 'RESOURCES');
  
  // Notice we wrap the gathered resources in an array `[]`
  return `if (action === "${action}" && [\n${resources}].includes(resource)) {\n  return "${effect}";\n}\n`;
};

// 4. Policy Block Generation (The Root Wrapper)
// Collects the roles and rules, wrapping them in a named JavaScript function.
generator.forBlock['rbac_policy'] = function (block: Blockly.Block): string {
  const name = block.getFieldValue('NAME');
  
  // Recursively gather all role and rule strings
  const roles = generator.statementToCode(block, 'ROLES');
  const rules = generator.statementToCode(block, 'RULES');

  // Construct the final function definition
  const code = `function ${name}(role, action, resource) {
  // 1. Check if the role is governed by this policy
  if (![\n${roles}  ].includes(role)) {
    return "Deny";
  }

  // 2. Evaluate all rules
${rules}
  // 3. Default fallback if no rules match
  return "Deny";
}
`;
  return code;
};