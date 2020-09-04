import {CompilationContext} from "../../types"
import {RuleGroup, Rule} from "../rules"

export function schemaHasRulesForType({RULES, schema}: CompilationContext, ty: string): boolean {
  const group = RULES.types[ty]
  return group && group !== true && shouldUseGroup(schema, group)
}

export function shouldUseGroup(schema: object, group: RuleGroup): boolean {
  return group.rules.some((rule) => shouldUseRule(schema, rule))
}

export function shouldUseRule(schema: object, rule: Rule): boolean | undefined {
  return (
    schema[rule.keyword] !== undefined ||
    rule.definition.implements?.some((kwd) => schema[kwd] !== undefined)
  )
}