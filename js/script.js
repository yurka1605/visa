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

    $('.banner__form-btn button, .banner__form-btn--mobile').click(() => {
        const mounth = $('.banner-form-select--mounth .current').text().trim();
        const country = $('.banner-form-select--countries .current').text().trim();
        const current = window.countries.find(el => el.name === country);
        $('.variants__filter-item--mounth .variants__filter-item_value').text(mounth);
        $('.variants__filter-item--country_flag').html(current?.flag);
        $('.variants__filter-item--country_name').html(country);
        $('.variants').addClass('show');
        showVariants(current, mounth);
    });

    $('button[data-callme="true"]').click(() => {
        $('.callme').addClass('show');
        $('body, html').css('overflow', 'hidden');
    });

    $('.callme__type').click(e => {
        e.preventDefault();
        if (!$(e.currentTarget).hasClass('active')) {
            $('.callme__type').each((i, el) => {
                $(el).removeClass('active');
            });
            $(e.currentTarget).addClass('active');
        }
    });

    $('.callme__amount').click(e => {
        e.preventDefault();
        if (!$(e.currentTarget).hasClass('active')) {
            $('.callme__amount').each((i, el) => {
                $(el).removeClass('active');
            });
            $(e.currentTarget).addClass('active');
        }
    });

    $('.callme__container').click(e => e.stopPropagation());
    $('.callme, .callme__close').click(e => {
        $('body, html').css('overflow', 'auto');
        $('.callme').removeClass('show');
    });
});

function addFlag() {
    const name = $('.banner-form-select--countries .current').text().trim();
    const flag = window.countries.find(el => el.name === name).flag;
    $('.banner-form-select--countries .current').html(`${flag}<span>${name}</span>`);
}

async function getCountries() {
    const url = window.origin;
    const res = await fetch(`${url}/js/countries.json`);
    const countries = res.ok ? (await res.json()) : [];
    return countries;
}

function showVariants(current, mounth) {
    $('.variants__list').addClass('loader');

    if (current.sale_c) {
        $('.variants__list_item--visa-c').addClass('variants__list_item--with-sale'); 
    } else {
        $('.variants__list_item--visa-c').removeClass('variants__list_item--with-sale');
    }

    if (current.sale_d) {
        $('.variants__list_item--visa-d').addClass('variants__list_item--with-sale'); 
    } else {
        $('.variants__list_item--visa-d').removeClass('variants__list_item--with-sale'); 
    }

    $('.variants__list_item--visa-c img').attr({
        'src': `./image/country/${current.key}1.jpg`,
        'alt': current.name
    });

    $('.variants__list_item--visa-d img').attr({
        'src': `./image/country/${current.key}2.jpg`,
        'alt': current.name
    });

    $('.variants__list_item-name').text(`Виза в "${current.name}"`);
    $('.variants__list_item-option--duration').text(current.duration);
    $('.variants__list_item-visited-opt--multiple')
        .removeClass('success')
        .removeClass('error')
        .addClass(current.multiple ? 'success': 'error');
    $('.variants__list_item-visited-opt--today')
        .removeClass('success')
        .removeClass('error')
        .addClass(current.visited_today ? 'success': 'error');

    $('.banner__img').attr({
        'src': `./image/country/${current.key}1.jpg`,
        'alt': current.name
    });

    setTimeout(() => {
        $('.variants__list').removeClass('loader');
    }, 1000);
}