
import IconGlassMartini from '../assets/img/Icon-awesome-glass-martini-alt.svg';
import Link from 'next/link'
import { createSkeletonElement, createSkeletonProvider } from '@trainline/react-skeletor';
import giff2 from '../assets/img/muestras/Giff_2_main_page.png';
const Img = createSkeletonElement('img');

function Page({ products, categories }) {
  const keyBy = (arr, key) => arr.reduce((acc, el) => {
    acc[el[key]] = [...acc[el[key]] || [], el];
    return acc
  }, {});

  const keyedProducts = keyBy(products, 'categoria');

  const galleryItems = categories.map(category => {
    console.log("Gorup", category.id);
    if (typeof keyedProducts[category.id] !== "undefined") {
      let products = keyedProducts[category.id];
      return <div>
        <div className="titlemain">
          <h1>{category.nombre}</h1>
          <h1>
            <Link href="/catalogo/[category]" as={`/catalogo/${category.id}`} passHref>
              Ver todos
            </Link>
          </h1>
        </div>

        <ul className="hs no-scrollbar">
          {products.map((product, index) => {
            return <li className="item">
              <div key={index} className="container__col-lg-12 container__col-md-4">
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
            </li>
          })
          }
        </ul>
      </div>
    } else {
      return null;
    }
  });

  return (

    <div className="mainpage">



      {galleryItems}
      <ul className="hs no-scrollbar">
        <li className="item">
          <div className="item container__col-lg-12 container__col-md-4">
            <div className="card">
              <div className="card_image"> <img src={giff2} /> </div>
              <div className="card_title title-white">
                <img src={IconGlassMartini} />
              </div>
            </div>
          </div>
        </li>
        <li className="item">
          <div className="item container__col-lg-12 container__col-md-4">
            <div className="card">
              <div className="card_image"> <img src={giff2} /> </div>
              <div className="card_title title-white">
                <img src={IconGlassMartini} />
              </div>
            </div>
          </div>
        </li>
        <li className="item">
          <div className="item container__col-lg-12 container__col-md-4">
            <div className="card">
              <div className="card_image"> <img src={giff2} /> </div>
              <div className="card_title title-white">
                <img src={IconGlassMartini} />
              </div>
            </div>
          </div>
        </li>
      </ul>
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
)(Page);