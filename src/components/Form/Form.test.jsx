import { fireEvent, getByRole, getByText, render,screen } from "@testing-library/react"
import Form from '../Form';

//!"/ncgshdgfh/" metnin bir bölümü. 
        //!sondaki i küçük büyük harf duyarlılığını ortadan kaldırır
test("Koşulların onay durumuna göre buton aktifliği", () => 
    {
    //1-test edileck eleman render lanır
    render(<Form />);

    //2- gerekli element cağırılır (button | checkbox)
    const button = screen.getByRole("button");
    const checkbox = screen.getByRole("checkbox");
    //3- checkbox tıklanmamıştır
    expect(checkbox).not.toBeChecked()
    //4 buton inaktiftir
    expect(button).toBeDisabled()
    //5 checkbox ı tıkla
    fireEvent.click(checkbox)
    //6 buton aktif mi kontrol et
    expect(button).toBeEnabled
    //7-checkbox tan tiki kaldır
    fireEvent.click(checkbox)
    //8-buton inaktif mi kontrol et
    expect(button).toBeDisabled
})

test("Butonun hover durumuna göre bildirim ekrana gelir", () => {
    render(<Form/>);
       
        //gerekli elementleri al
        const checkbox = screen.getByRole("checkbox");
        const button = screen.getByRole("button");
        const alert = screen.getByText(/size gerçekten/i); 
        
        //bildrim ekranda gözükmüyor
        expect(alert).not.toBeVisible();

        //checkboxı tikle
        fireEvent.click(checkbox);
        //mouse u button un üzerine getir(hover)
        fireEvent.mouseEnter(button)
        //ekranda bildrim vmı kontrol et
        expect(alert).toBeVisible()
        //mouse u butondan çek
        fireEvent.mouseLeave(button)
        //bildrm ekrnda gözükmüyor
        expect(alert).not.toBeVisible()
});