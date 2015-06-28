<?php

namespace FrontendBundle\Controller;

use Doctrine\Common\Util\Debug;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\Constraint;
use uebb\HateoasBundle\Entity\Root;
use uebb\HateoasBundle\Entity\User;

class FrontendController extends \Symfony\Bundle\FrameworkBundle\Controller\Controller
{
    protected $rootRoute = 'backendbundle_api_v1_get_root';

    public function indexAction(Request $request, $path)
    {
        $root = $this->get('uebb.hateoas.link_resolver')->resolveLink($this->generateUrl($this->rootRoute));

        $preCachedResources = array($root);

        if ($this->getUser() instanceof User) {
            $preCachedResources[] = $this->getUser();
            $root->setCurrentUser($this->getUser());
        }
        // TODO: Add more pre cached resources here depending on the current path

        return $this->render('FrontendBundle:Frontend:index.html.twig', $viewData = $this->getViewData($preCachedResources));
    }

    public function loginAction()
    {

        $authenticationUtils = $this->get('security.authentication_utils');

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render(
            'FrontendBundle:Frontend:login.html.twig',
            array_merge(
                $this->getViewData(),
                array(
                    // last username entered by the user
                    'last_username' => $lastUsername,
                    'error'         => $error
                )
            )
        );
    }

    public function loginCheckAction()
    {

    }

    protected function getViewData($preCachedResources = array())
    {
        return array(
            'apiRooturl' => $this->generateUrl($this->rootRoute, array()),
            'baseUrl' => $this->container->get('router')->getContext()->getBaseUrl(),
            'environment' => $this->container->getParameter('kernel.environment'),
            'preCachedResources' =>  $this->get('jms_serializer')->serialize($preCachedResources, 'json')
        );
    }

}