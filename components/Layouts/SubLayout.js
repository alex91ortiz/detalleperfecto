import '../../assets/scss/main.scss'
import Nav from './Head'
import Sides from './Sides'

export default function SubLayout({ children , gotocat}) {
    return <div>
        <Nav gotocat={gotocat}/>
        {children}
        <Sides scrollinSides={false}/>
    </div>
}