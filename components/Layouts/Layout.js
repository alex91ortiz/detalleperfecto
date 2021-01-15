import '../../assets/scss/main.scss'
import Nav from './Head'

export default function Layout({ children }) {
    return <div>
        <Nav filters={true} gotocat={true} />
        {children}
        {/*<Sides scrollinSides={true}/>*/}
    </div>
}