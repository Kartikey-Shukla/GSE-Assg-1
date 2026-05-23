# Test Report

**❌ 3 test(s) failed** &nbsp;·&nbsp; 17/20 passing &nbsp;·&nbsp; 2026-05-23 02:25 UTC

## `tests/generator.test.ts`

### Step 1 – Block Definitions

- ✅ rbac_role block exists and has a ROLE dropdown field
- ✅ rbac_role ROLE dropdown includes BROKERAGEOWNER, REALESTATEAGENT, and BUYER
- ✅ rbac_resource block exists and has a RES dropdown field
- ✅ rbac_resource RES dropdown includes CONFIDENTIALSELLERDATA, ACTIVELISTINGS, and VIRTUALTOURS
- ✅ rbac_rule block exists with EFFECT, ACTION fields and RESOURCES input
- ✅ rbac_rule EFFECT accepts ALLOW and DENY; ACTION accepts Delist, List, Browse
- ✅ rbac_policy block exists with NAME field and ROLES, RULES statement inputs
### Step 2 – Per-Block Code Generation

- ✅ rbac_role generates a quoted string for the selected role
- ✅ rbac_resource generates a quoted string for the selected resource
- ❌ rbac_rule with ALLOW generates return "Allow" and references the ACTION
  > 💬 AssertionError: generator.forBlock["rbac_rule"] must return "Allow" when EFFECT is ALLOW: expected 'if (action === "DELIST" && [\n].inclu…' to match /["']Allow["']/
- ❌ rbac_rule with DENY generates return "Deny"
  > 💬 AssertionError: generator.forBlock["rbac_rule"] must return "Deny" when EFFECT is DENY: expected 'if (action === "LIST" && [\n].include…' to match /["']Deny["']/
- ✅ rbac_policy generates a named function with the correct signature
### Step 3 – Full Policy Generation

- ✅ generates a function named RealEstateMlsSystem from the fixture workspace
- ✅ generated code includes a role membership guard with BROKERAGEOWNER
- ✅ generated code includes an action+resource conditional for DELIST on CONFIDENTIALSELLERDATA
- ✅ generated code has a default return "Deny" at the end
### Step 4 – Policy Evaluation Correctness

- ❌ RealEstateMlsSystem: BROKERAGEOWNER DELIST CONFIDENTIALSELLERDATA → Allow
  > 💬 AssertionError: BROKERAGEOWNER performing DELIST on CONFIDENTIALSELLERDATA should be allowed — check that the fixture has BROKERAGEOWNER in ROLES with an ALLOW DELIST rule for CONFIDENTIALSELLERDATA: expected 'ALLOW' to be 'Allow' // Object.is equality
- ✅ RealEstateMlsSystem: REALESTATEAGENT DELIST CONFIDENTIALSELLERDATA → Deny (role not listed)
- ✅ RealEstateMlsSystem: BROKERAGEOWNER LIST CONFIDENTIALSELLERDATA → Deny (action not covered)
- ✅ RealEstateMlsSystem: BROKERAGEOWNER DELIST ACTIVELISTINGS → Deny (resource not covered)

---

> ⚠️ Read the messages above — each one tells you exactly what to implement next.
