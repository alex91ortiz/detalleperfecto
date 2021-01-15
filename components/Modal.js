import IconGlassMartini from '../assets/img/Icon-awesome-glass-martini-alt.svg';
import Link from 'next/link'


function List({ products }) {
    const {tick} = useSelector(state => state);
    return (

        <div>{tick}</div>
    )
}

export default List;