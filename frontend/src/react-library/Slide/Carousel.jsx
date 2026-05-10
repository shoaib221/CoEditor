


export const SlideProduct = () => {


    const ids=[ "img1", "img2", "img3", "img4" ];
    const [ index, setIndex ] = useState(0);

    const leftSlide = () => {
        if( index>0 ) setIndex(index-1);
        else setIndex( ids.length-1 );
    }

    const rightSlide = () => {
        if( index < ids.length-1 ) setIndex( index+1 );
        else setIndex(0);
    }

    return (
        <div className="slide-product" id={ ids[index] }  style={{ position: 'relative' }}   >

            <button onClick={leftSlide} id="left-button" style={{ fontSize: '2rem' }} > &#8592; </button>
            <button onClick={rightSlide} id="right-button" style={{ fontSize: '2rem' }} > &#8594; </button>

            <div id='black-body' style={{ position: 'absolute', top: '0px', left: '0px', width: '100%',
                height: '150vh', display: 'none', backgroundColor: 'rgb(0, 0, 0, 0.7)', zIndex: '3'
             }} >  </div>

        </div>
    )
}