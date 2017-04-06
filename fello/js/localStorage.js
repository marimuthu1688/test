  var iniList;


    iniList=[
    {
        id:'1',
      name: 'Animals',
        pubdate: new Date('2017', '04', '01'),
      cards:[{
      cardid:'1',
      content: 'Includes over 250 glyphs in font format from the Glyphicon Halflings set.',
      pubdate: new Date('2016', '02', '03')
      },
      {
      cardid:'2',
      content: 'Glyphicons Halflings are normally not available for free',
      pubdate: new Date('2017', '02', '10')
      }
    ]
    },
    {
      id:'2',
        name: 'Cars',
        pubdate: new Date('2017', '01', '04'),
      cards:[{
      cardid:'1',
      content: 'Includes over 250 glyphs in font format from the Glyphicon Halflings set.',
      pubdate: new Date('2017', '01', '09')
      },
      {
      cardid:'2',
      content: 'Glyphicons Halflings are normally not available for free',
      pubdate: new Date('2017', '01', '10')
      }]
    },
    {
      id:'3',
        name: 'Countries',
        pubdate: new Date('2017', '02', '01'),
      cards:[{
      cardid:'1',
      content: 'Includes over 250 glyphs in font format from the Glyphicon Halflings set.',
      pubdate: new Date('2017', '02', '24')
      },
      {
      cardid:'2',
      content: 'Glyphicons Halflings are normally not available for free',
      pubdate: new Date('2017', '02', '24')
      },
      {
      cardid:'1',
      content: 'Includes over 250 glyphs in font format from the Glyphicon Halflings set.',
      pubdate: new Date('2017', '04', '01')
      }]
    },
    {
      id:'4',
        name: 'Oceans',
        pubdate: new Date('2017', '02', '01'),
      cards:[{
      cardid:'1',
      content: 'Includes over 250 glyphs in font format from the Glyphicon Halflings set.',
      pubdate: new Date('2017', '02', '04')
      },
      {
      cardid:'2',
      content: 'Glyphicons Halflings are normally not available for free',
      pubdate: new Date('2017', '03', '02')
      }]
    }
  ];

  if (typeof(Storage) != "undefined") {
    localStorage.setItem("lists", JSON.stringify(iniList));
} else {
    alert("localStorage is not available!");
}
