<?php

namespace FrontendBundle\Controller;

use Doctrine\Common\Util\Debug;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class FrontendController extends \Symfony\Bundle\FrameworkBundle\Controller\Controller
{
    public function indexAction(Request $request)
    {
        return $this->render(
            'FrontendBundle:Frontend:index.html.twig',
            $this->getViewData()
        );
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

    protected function getViewData()
    {
        return array(
            'apiRooturl' => $this->generateUrl('root', array(), UrlGeneratorInterface::ABSOLUTE_URL),
            'baseUrl' => $this->container->get('router')->getContext()->getBaseUrl(),
            'environment' => $this->container->getParameter('kernel.environment')
        );
    }


}