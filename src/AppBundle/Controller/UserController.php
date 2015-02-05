<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use uebb\HateoasBundle\Controller\HateoasController;

class UserController extends HateoasController
{
    protected $entityName = 'AppBundle:User';

    /**
     * @param int $id
     * @param Request $request
     * @return \FOS\RestBundle\View\View
     */
    public function getContactsAction($id, Request $request) {
        return $this->getLinkCollection($id, 'contacts', $request);
    }
}


