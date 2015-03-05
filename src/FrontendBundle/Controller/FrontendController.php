<?php

namespace FrontendBundle\Controller;

use Doctrine\Common\Util\Debug;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use uebb\HateoasBundle\Entity\Root;
use uebb\HateoasBundle\Entity\User;

class FrontendController extends \Symfony\Bundle\FrameworkBundle\Controller\Controller
{
    public function indexAction(Request $request, $path)
    {
        $root = new Root('/api/v1');

        $preCachedResources = array($root);

        if ($this->getUser() instanceof User) {
            $preCachedResources[] = $this->getUser();
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
        $serializedPreCachedResources = array();
        foreach($preCachedResources as $resource) {
            $serializedPreCachedResources[] = $this->get('jms_serializer')->serialize($resource, 'json');
        }

        return array(
            'apiRooturl' => $this->generateUrl('root', array()),
            'baseUrl' => $this->container->get('router')->getContext()->getBaseUrl(),
            'environment' => $this->container->getParameter('kernel.environment'),
            'preCachedResources' => '[' . implode(',', $serializedPreCachedResources) . ']'
        );
    }


}