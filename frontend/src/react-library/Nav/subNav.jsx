

export const OptionBar = (props) => {

    function onLeftSlide () {
        let elem = document.getElementById('left-slide')
        let elem2 = document.getElementById('slidein')
        elem.style.display='flex'
        
        elem2.style.animation='anim1 .5s forwards'
    }

    return (
        <div  id="optionbar" >
            <Link className='oplink' onClick={ onLeftSlide } > Home </Link>
            <Link className="oplink" to='/product' > home2 </Link>
            <Link className="oplink" to="/orders"> home3 </Link>
            <Link className="oplink" to="/style"> home4 </Link>
            <Link className="oplink" to='/product' > home2 </Link>
            <Link className="oplink" to="/orders"> home3 </Link>
            <Link className="oplink" to="/style"> home4 </Link>
            <Link className="oplink" to='/product' > home2 </Link>
            <Link className="oplink" to="/orders"> home3 </Link>
            <Link className="oplink" to="/style"> home4 </Link>
            <LeftSlide />
        </div>
    )
}