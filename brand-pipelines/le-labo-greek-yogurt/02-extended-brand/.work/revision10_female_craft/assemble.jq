.[0] as $top
| .[1] as $strategy
| .[2] as $product
| .[3] as $visual
| {
    schema_version: $top.schema_version,
    artifact_type: "extended_brand_anatomy",
    generated_at: $top.generated_at,
    source_analysis: $top.source_analysis,
    target: $top.target,
    editorial_structure: $top.editorial_structure,
    sections: (
      $strategy.owned_sections
      + $product.owned_sections
      + $visual.owned_sections
    ),
    registered_anchor_assets: $top.registered_anchor_assets,
    moodboard_inputs: $top.moodboard_inputs,
    boundaries: (
      $top.boundaries
      | .assumptions += ($strategy.boundary_additions.assumptions // [])
      | .factual_limits += (
          ($strategy.boundary_additions.factual_limits // [])
          + (if ($product.boundary_additions | type) == "array" then $product.boundary_additions else ($product.boundary_additions.factual_limits // []) end)
          + (if ($visual.boundary_additions | type) == "array" then ($visual.boundary_additions | map(.rule // tostring)) else ($visual.boundary_additions.factual_limits // []) end)
        )
      | .source_traits_not_to_copy += (
          ($strategy.boundary_additions.source_traits_not_to_copy // $strategy.boundary_additions.protected_source_boundaries // [])
          + (if ($product.boundary_additions | type) == "object" then ($product.boundary_additions.source_traits_not_to_copy // []) else [] end)
          + (if ($visual.boundary_additions | type) == "object" then ($visual.boundary_additions.source_traits_not_to_copy // []) else [] end)
        )
      | .assumptions |= unique
      | .factual_limits |= unique
      | .source_traits_not_to_copy |= unique
    )
  }
