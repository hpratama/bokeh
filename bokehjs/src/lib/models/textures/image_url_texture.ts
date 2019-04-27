import {Texture} from "./texture"
import * as p from "core/properties"
import {Context2d} from 'core/util/canvas'

export namespace ImageURLTexture {
    export type Attrs = p.AttrsOf<Props>

    export type Props = Texture.Props  & {
        url: p.Property<string>
    }
  }

  export interface ImageURLTexture extends ImageURLTexture.Attrs {}

  export abstract class ImageURLTexture extends Texture {
    properties: ImageURLTexture.Props

    constructor(attrs?: Partial<ImageURLTexture.Attrs>) {
      super(attrs)
    }

    static initClass(): void {
      this.prototype.type = "ImageURLTexture"

      this.define<ImageURLTexture.Props>({
        url: [ p.String ],
      })
    }

    initialize(): void {
      super.initialize()
      this.image = new Image()
      this.image.src = this.url
      // this.image.onload = () => {
      //   console.log("DLKJGLDJLJD")
      // }
    }

    get_pattern(_color: any, _scale: number, _weight: number): (ctx: Context2d) => CanvasPattern | null {
      return (ctx: Context2d): CanvasPattern | null => {
        return ctx.createPattern(this.image, this.repetition)
      }
    }

    private image: HTMLImageElement

  }
  ImageURLTexture.initClass()