import { EffectResizeBox, LayoutEffectResizeBox } from './flicking_boxes'
import ScrollAndCount from './test_use_ref'

export const FlickingBox = () => (
    <div>
        <div style={{ display: 'inline-block' }}>
            <LayoutEffectResizeBox />
            <EffectResizeBox />
        </div>
        <div>
            <ScrollAndCount />
        </div>
    </div>
)
