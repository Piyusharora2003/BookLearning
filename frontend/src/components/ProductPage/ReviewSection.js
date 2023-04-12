import React from 'react'
import style from "./Review.module.css"

function ReviewSection({prod}) {
    let reviews = prod.reviews;
    console.log(reviews);
  return (
    <div className={style.body}>
        <h2 className={style.heading}>Reviews</h2>
        <div className={style.main}>

            <div className={style.leftpart}>


{/* Review Card */}
{
    reviews.map((elem)=>{
        return  <section className={style.testimonials}>
                    <div className={style.testimonialBoxContainer}>
                        <div className={style.testimonialBox}>
                            <div className={style.boxTop}>
                                <div className={style.profile}>
                                    <div className={style.profileImg}>
                                        <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                                    </div>
                                    <div className={style.nameUser}>
                                        <strong>Barry Alln</strong>
                                    </div>
                                </div>
                                <div className={style.reviews}>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                </div>
                            </div>
                            <div className={style.clientComment}>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.</p>
                            </div>
                        </div>
                    </div>
                </section>
 })}    
            </div>

            <div className={style.rightpart}>
                right part here i will be adding a add new review feature
            </div>
    </div>
    </div>
  )
}

export default ReviewSection