import '../../assets/scss/main.scss'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function LayoutNoSides({ children }) {
    const router = useRouter()
    return <div>
        <svg className="division" viewBox="0 0 1488 150">
            <path fill="rgba(223,204,226,1)" id="division" d="M 0 0 L 1488 0 L 1488 150 C 1488 150 1482.3642578125 40.66885375976562 1288.1416015625 26.8076171875 C 1093.9189453125 12.94637298583984 711.1095581054688 94.55502319335938 711.1095581054688 94.55502319335938 C 711.1095581054688 94.55502319335938 395.6123657226562 122.2881622314453 217.8349609375 109.6005859375 C 40.05757141113281 96.91300201416016 0 43.8046875 0 43.8046875 L 0 0 Z">
            </path>
        </svg>
        <div className="header">
            <div className="container__row">
                <div className="container__col-md-al-2 container__col-lg-2">
                    <button type="button" className="icon_left" onClick={() => router.back()}>
                        <FontAwesomeIcon icon={faArrowLeft} color="white" className="icon-button-panel-card" width="20" height="20" />
                    </button>
                </div>
                <div className="container__col-md-al-8 container__col-lg-8">
                </div>
                <div className="container__col-md-al-2 container__col-lg-2">
                    <img className="icon_right" src={require('../../assets/img/Logo_Dp_Mini.png')} />
                </div>
            </div>

        </div>
        {children}
    </div>
}