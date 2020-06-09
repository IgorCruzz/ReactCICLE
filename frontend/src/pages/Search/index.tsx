import React, { useEffect, useState } from 'react'
import { Container, Content, Image, ProductGridLarge, ProductList, NoFound } from './styles'
import banner from '../../assets/search.png'
import { useSelector } from 'react-redux'
import api from '../../services/api'
import ModalProduct from '../Product'

interface RootState {
  search: {
    name: string
  }
}

interface Product {
  id: number,
  name: string,
  price: number,
  quantity: number,
  avatar_url: string
}

const SearchList: React.FC = () => {
  const search = useSelector((state: RootState) => state.search.name)
  const [products, setProducts] = useState<Product[]>([])
  const [product, setProduct] = useState({ id: 1, avatar_url: '', name: '', price: 0, quantity: 0 })
  const [openProduct, setOpenProduct] = useState(false)

  useEffect(() => {
    if (search === '') {
      return
    }

    api.get(`product/busca?name=${search}`).then(response => {
      setProducts(response.data)
      console.log(products)
    })
  }, [search])

  return (
    <Container>
      <Content>
        {openProduct && <ModalProduct product={product} close={() => setOpenProduct(false)}/>}
        <Image>
          <img src={banner} alt="banner" />
        </Image>
        {products.length > 0 ? (
          <>
            <small>Voce pesquisou por: <strong>{search}</strong></small>

            <ProductGridLarge>
              {products?.map(product => (

                <ProductList key={product.id} onClick={() => {
                  setProduct({ id: product.id, avatar_url: product.avatar_url, name: product.name, price: product.price, quantity: product.quantity })
                  setOpenProduct(true)
                }}>
                  <div >
                    <img
                      src={product.avatar_url}
                      alt="avatar" />
                  </div>
                  <p>{product.name}</p>
                  <strong>{Number(product.price).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}</strong>
                </ProductList>

              ))}

            </ProductGridLarge>
          </>
        )
          : (
            <NoFound>
              <small>Voce pesquisou por: <strong>{search}</strong></small>
              <strong>Não há produtos com este nome</strong>
            </NoFound>
          )}

      </Content>
    </Container>
  )
}

export default SearchList
