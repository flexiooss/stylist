StyleSheetMedia:
  name: string
  medias:
    $list : string

StyleRules:
  selector: string
  rules:

MediaRules:
  media:
    $value-object:
      io.flexio.stylist.types.StyleSheetMedia
  rules:
    $list:
      $value-object:
        io.flexio.stylist.types.Rule

Rule:
  property: string
  value: string
