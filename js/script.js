$(document).ready(function() {
    getCountries().then(countries => {
        window.countries = countries;
        countries.forEach(country => {
            const opt = $('<option>').val(country.name).html(
                `<div class="banner-form-option-value">
                    ${country.flag}
                    <span>${country.name}</span>
                </div>`
            );
            $('.banner-form-select--countries').append(opt);
        });
        $('select').niceSelect();
        countries.forEach(country => {
            $(`[data-value="${country.name}"]`).html(`
                <div class="banner-form-option-value">
                    ${country.flag}
                    <span>${country.name}</span>
                </div>`
            );
        });
        addFlag();
    });

    $('.banner-form-select--countries').change(addFlag);

    $('.variants__filter-item--year .variants__filter-item_value').text((new Date).getFullYear());

    $('.banner__form-btn button').click(() => {
        const mounth = $('.banner-form-select--mounth .current').text().trim();
        const country = $('.banner-form-select--countries .current').text().trim();
        $('.variants__filter-item--mounth .variants__filter-item_value').text(mounth);
        $('.variants__filter-item--country_flag').html(window.countries.find(el => el.name === country).flag);
        $('.variants__filter-item--country_name').html(country);
        $('.variants').addClass('show');
    });
});

function addFlag() {
    const name = $('.banner-form-select--countries .current').text().trim();
    const flag = window.countries.find(el => el.name === name).flag;
    $('.banner-form-select--countries .current').html(`${flag}<span>${name}</span>`);
}

async function getCountries() {
    const url = document.URL;
    const res = await fetch(`${url}js/countries.json`);
    const countries = res.ok ? (await res.json()) : [];
    return countries;
}