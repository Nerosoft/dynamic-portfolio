import jQueryBridget from './jquery-bridget.js';
import Isotope from 'isotope-layout';
//import imagesLoaded from './imagesloaded.js';
import $ from 'jquery'
import imagesloaded from 'imagesloaded';
class ProjectsCards {

  constructor() {
    // make Isotope and imagesLoaded a jQuery plugins

    // jQueryBridget('isotope', Isotope, $);
    // jQueryBridget('imagesLoaded', imagesLoaded, $);
  }

  init() {

    // var $grid = $('.grid').imagesLoaded(() => {
    //   $grid.isotope({
    //     itemSelector: '.element-item',
    //     layoutMode: 'masonry',
    //     masonry: {
    //       horizontalOrder: true,
    //       fitWidth: true,
    //       gutter: 10,
    //     },
    //   })
    // });


    
    var imgLoad = new imagesloaded('#projects', () => {
      let grid = document.querySelector('.grid');
     // console.log('Isotope', grid)
      let iso = new Isotope(grid, {

        itemSelector: '.element-item',
        layoutMode: 'masonry',
        masonry: {
          horizontalOrder: true,
          fitWidth: true,
          gutter: 10,
        },

      });

      let buttonGroup = document.querySelector('.filters-button-group')
      buttonGroup.onclick= (el)=>{
        var filterValue = el.path[0].dataset.filter
          //console.log(el.path[0].dataset.filter)
        iso.arrange({ filter: filterValue });
      }

      iso.layout();
    });

    // imgLoad.on( 'always', function( instance ) {
    //   console.log('ALWAYS - all images have been loaded');
    // });

    $('.button-group').each(function (i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', 'button', function () {
        $buttonGroup.find('.active').removeClass('active');
        $(this).addClass('active');
      });
    });
  }

}

export { ProjectsCards as default }
