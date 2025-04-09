import { findAllByRole, render,screen } from "@testing-library/react"
import Scoops from "./index"
import userEvent from "@testing-library/user-event"


/*
!Seçiciler
1 Method tipi - 2 All ifadesi- 3- Seçici Method
*get > render anında DOM da olan elementleri almak için kullanılır-elementi bulamazsa test başarısız olur

*query> elementin ekranda olma durumu kesin değilse kullanılır.get ile benzer çalışır.- elementi bulamazsa null döndürür test devam eder 

*find > elementin ekrana basılmasının asenkron olduğu durumlarda kullanılır.(api isteği sonucu ekrana basılacaksa)
*not: find metodu promise döndürdüğü için async await ile kullanılmalı

*-eğer seçici methoda all ifadesi eklenirse seçici koşula uyan bütün elemanları getirir
not: all kullanılırsa dönen cevapta 1 eleman olsa bile dizi döner
*/
test("Apiden alınan veriler için ekrana kartlar basılır", async () => {
    render(<Scoops />)
    //ekrana basılan kartları al(resimleri almak yeterli)
    const images = await screen.findAllByAltText("çeşit-resim");

        //ekrandaki resimlerin (kartların) sayısı 1 den fazlamı
        expect(images.length).toBeGreaterThanOrEqual(1)
})

test("Çeşitlerin ekleme ve azaltma işlevlerinin toplam fiyata etkisi", async () => {
    //!userEvent kurulmu yap
    const user = userEvent.setup();
    
    //test edilecek bileşen render edilir
    render(<Scoops />);

    //bütün ekleme ve azaltma butonlarını çağır
    const addBtns = await screen.findAllByRole("button",{ name: "Ekle" });
    const delBtns = await screen.findAllByRole("button",{ name: "Azalt" });

        //toplam fiyat elementini çağır
        const total = screen.getByTestId("total")

        //başlngc annda toplam 0 mı kontrol et
        //!"^" sadece o metin
        expect(total).toHaveTextContent(/^0$/) 
       
        //choclate ın ekle butonuna tıkla
        await user.click(addBtns[2]);
        
        //toplam fiyat 20 mi kontrol et
        expect(total).toHaveTextContent(/^20$/) 

        //vanilla nın ekle butonuna çift tıkla
        await user.dblClick(addBtns[1]);
        
        //toplam fiyat 60 mı kontrol et
        expect(total).toHaveTextContent(/^60$/) 

        //vanıllanın azalt butonuna tıkla
        await user.click(delBtns[1])
        
        //toplam fiyat 40 mı kontrol et
        expect(total).toHaveTextContent(/^40$/) 

        //vanillanın azalt butonuna tıkla
        await user.click(delBtns[1])

        //toplam fiyat 20 mı kontrol et
        expect(total).toHaveTextContent(/^20$/) 

        //choclate ın azalt butonuna tıkla
        await user.click(delBtns[2])

        //toplam fiyat 0 mı kontrol et
        expect(total).toHaveTextContent(/^0$/) 
        
});
