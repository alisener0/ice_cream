import { render, screen } from "@testing-library/react";
import Toppings from "./index";
import  userEvent  from '@testing-library/user-event';

test("sosları ekleme ve çıkarma işlemlerinin toplam fiyata etkisi", async () => {
    const user = userEvent.setup()
    //1 bileşeni renderla
        render(<Toppings />)
   
        //2 toplam span ı al
    const total = screen.getByTestId("total")
   
    //3tüm sosları al
    const cards = await screen.findAllByTestId("card")
   
    //4başlangıçta toplam 0 mı kontrol et
    expect(total).toHaveTextContent(/^0$/)
   
    //5 bir sosa tıkla 
   await  user.click(cards[3])
   
    //6 toplam 3 oldumu kontrol et
    expect(total).toHaveTextContent(/^3$/)

    //7farklı bir sosa tıkla
    await user.click(cards[4])
    
    //8toplam 6 oldumu kontrol et
    expect(total).toHaveTextContent(/^6$/)

    //9tıklanan soslardan birine tekrar tıkla
    await user.click(cards[4])

    //10toplam 3 oldumu kontrol et
    expect(total).toHaveTextContent(/^3$/)

    //11tıklanan soslardan birine tekrar tıkla
    await user.click(cards[3])
        
    //12toplam 0 oldumu kontrol et
    expect(total).toHaveTextContent(/^0$/)
});



test("soslar sepete eklendiği zaman active class ı alır", async () => {
    const user = userEvent.setup()
    //1 bileşeni renderla
    render(<Toppings />)
    
    //bütün kartları al
    const cards =  await screen.findAllByTestId("card")

    //bütün kartların active classına sahip olmadgndan emin ol
    cards.forEach((card) => expect(card).not.toHaveClass("active"))
    
    //m&m kartına tıkla
    await user.click(cards[0])
   
    //m&m kartı active mi
    expect(cards[0]).toHaveClass("active")
    
    //m&m kartına tekrar tıkla
    await user.click(cards[0])

    //m&m kartı aktifliğini kaybettimi 
    expect(cards[0]).not.toHaveClass("active")




})