import Carousel from 'react-bootstrap/Carousel'

export default function Homepage() {
  const datas = [
    { imgName: '2', url: 'https://img.freepik.com/free-vector/memphis-blue-background-with-halftone-line-elements_1017-33622.jpg' },
    { imgName: '3', url: 'https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg' },

  ]
  return <>



    <Carousel>
      {datas.map((data, i) => {
        return (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100 h-90 text-black"
              src={data.url}
              alt="First slide"
            // height={450}
            // width={450}
            />
            <Carousel.Caption>
              <h3>{data.imgName}</h3>

            </Carousel.Caption>
          </Carousel.Item>

        )
      })}

    </Carousel>


    {/* Ini Carosushel ending */}
    {/* <ButtonGroup className="d-flex justify-content-center align-items-center mt-g" >
      <button className="btn btn-outline-primary" onClick={() => handleLimit("+")}>+</button>
      {limit > 1 &&
        <button className="btn btn-outline-primary" onClick={() => handleLimit("-")}>-</button>
      }
    </ButtonGroup> */}
  </>
}