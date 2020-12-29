const sizes = {
  MobileSmall:      '320px',
  MobileMedium:     '360px',
  MobileLarge:      '425px',
  Tablet:           '768px',
  Laptop:           '1024px',
  LaptopMedium:     '1366px',
  LaptopLarge:      '1440px',
  Desktop:          '2560px'
}

module.exports = {
  MobileSmall:      `(min-width: ${ sizes.MobileSmall   })`,
  MobileMedium:     `(min-width: ${ sizes.MobileMedium  })`,
  MobileLarge:      `(min-width: ${ sizes.MobileLarge   })`,
  Tablet:           `(min-width: ${ sizes.Tablet        })`,
  Laptop:           `(min-width: ${ sizes.Laptop        })`,
  LaptopMedium:     `(min-width: ${ sizes.LaptopMedium  })`,
  LaptopLarge:      `(min-width: ${ sizes.LaptopLarge   })`,
  Desktop:          `(min-width: ${ sizes.Desktop       })`
}