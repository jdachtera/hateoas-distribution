<?php
/**
 * Created by PhpStorm.
 * User: jascha
 * Date: 12.03.15
 * Time: 10:54
 */

namespace BackendBundle\Controller;

use FOS\RestBundle\Controller\Annotations\NamePrefix;

/**
 * Class RootController
 * @package BackendBundle\Controller
 */
class RootController extends \uebb\HateoasBundle\Controller\RootController {
    protected $entityNames = array(
        'gallery' => 'BackendBundle:Gallery',
        'image' => 'BackendBundle:Image',
        'user' => 'BackendBundle:User',
    );

}