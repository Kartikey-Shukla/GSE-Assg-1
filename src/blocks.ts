import * as Blockly from 'blockly';

// Export a function to define our blocks
export function defineBlocks() {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "rbac_policy",
      "message0": "Policy Name: %1",
      "args0": [
        {
          "type": "field_input",
          "name": "NAME",
          "text": "MyPolicy"
        }
      ],
      "message1": "Roles %1",
      "args1": [
        {
          "type": "input_statement",
          "name": "ROLES",
          "check": "rbac_role"
        }
      ],
      "message2": "Rules %1",
      "args2": [
        {
          "type": "input_statement",
          "name": "RULES",
          "check": "rbac_rule"
        }
      ],
      "colour": 230,
      "tooltip": "Define the overall RBAC policy",
      "helpUrl": ""
    },
    {
      "type": "rbac_role",
      "message0": "Role %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ROLE",
          "options": [
            ["BrokerageOwner", "BROKERAGEOWNER"],
            ["RealEstateAgent", "REALESTATEAGENT"],
            ["Buyer", "BUYER"]
          ]
        }
      ],
      "previousStatement": "rbac_role",
      "nextStatement": "rbac_role",
      "colour": 160,
      "tooltip": "Add a role to the policy",
      "helpUrl": ""
    },
    {
      "type": "rbac_rule",
      "message0": "%1 %2 on",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "EFFECT",
          "options": [
            ["Allow", "ALLOW"],
            ["Deny", "DENY"]
          ]
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            ["Delist", "DELIST"],
            ["List", "LIST"],
            ["Browse", "BROWSE"]
          ]
        }
      ],
      "message1": "Resources %1",
      "args1": [
        {
          "type": "input_statement",
          "name": "RESOURCES",
          "check": "rbac_resource"
        }
      ],
      "previousStatement": "rbac_rule",
      "nextStatement": "rbac_rule",
      "colour": 65,
      "tooltip": "Rule for actions on resources",
      "helpUrl": ""
    },
    {
      "type": "rbac_resource",
      "message0": "Resource %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "RES",
          "options": [
            ["ConfidentialSellerData", "CONFIDENTIALSELLERDATA"],
            ["ActiveListings", "ACTIVELISTINGS"],
            ["VirtualTours", "VIRTUALTOURS"]
          ]
        }
      ],
      "previousStatement": "rbac_resource",
      "nextStatement": "rbac_resource",
      "colour": 290,
      "tooltip": "Specify the resource",
      "helpUrl": ""
    }
  ]);
}