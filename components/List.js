
import IconGlassMartini from '../assets/img/Icon-awesome-glass-martini-alt.svg';
import Link from 'next/link'
import { createSkeletonElement, createSkeletonProvider } from '@trainline/react-skeletor';
import giff2 from '../assets/img/muestras/Giff_2_main_page.png';
const Img = createSkeletonElement('img');



function List({ products }) {


  return (
    <div className="container">
      { products.map((product, index) => {
        return <div key={index} className="container__col-lg-12 container__col-md-4">
          <Link href="/desayunos/[id]" as={`/desayunos/${product.id}-${product.seo}`} passHref>
            <a>
              <div className="card">
                <div className="card_image"> <Img key={index} src={product.image_sm} /> </div>
                <div className="card_title title-white">
                  <img src={IconGlassMartini} />
                </div>
              </div>
            </a>
          </Link>
        </div>

      })}
    </div>
  );
}

export default createSkeletonProvider(
  // Dummy data with a similar shape to the component's data
  {
    product: {
      image_sm: '_____',
    }
  },
  // Predicate that returns true if component is in a loading state
  ({ product }) => product === undefined,
  // Define the placeholder styling for the children elements,
  () => ({
    color: 'grey',
    backgroundColor: 'grey'
  })
)(List);