import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function ZoomImg({ children }) {
    return (
        <Zoom>
            {children}
        </Zoom>
    )
}


export default ZoomImg