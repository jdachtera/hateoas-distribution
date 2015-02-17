<?php
/**
 * Created by PhpStorm.
 * User: jascha
 * Date: 12.02.15
 * Time: 16:12
 */

namespace GalleryBundle\Security\Voter;


use Doctrine\Common\Util\Debug;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use uebb\HateoasBundle\Security\Authorization\Voter\ResourceVoter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use uebb\HateoasBundle\Event\AddLinkActionEventData;
use uebb\HateoasBundle\Event\GetActionEventData;
use uebb\HateoasBundle\Event\GetCollectionActionEventData;
use uebb\HateoasBundle\Event\GetLinkCollectionActionEventData;
use uebb\HateoasBundle\Event\PatchActionEventData;
use uebb\HateoasBundle\Event\PatchPropertyActionEventData;
use uebb\HateoasBundle\Event\PostActionEventData;
use uebb\HateoasBundle\Event\RemoveActionEventData;
use uebb\HateoasBundle\Event\RemoveLinkActionEventData;


class UserVoter extends ResourceVoter
{
    protected $supportedClasses = array(
        'GalleryBundle:User'
    );

    /**
     * @param TokenInterface $token
     * @param GetActionEventData $data
     * @return int
     */
    protected function get(TokenInterface $token, GetActionEventData $data) {
        return $this->hasRole('ROLE_USER', $token);
    }

    /**
     * @param TokenInterface $token
     * @param GetCollectionActionEventData $data
     * @return int
     */
    protected function getCollection(TokenInterface $token, GetCollectionActionEventData $data) {
        return $this->hasRole('ROLE_USER', $token);
    }

    /**
     * @param TokenInterface $token
     * @param GetLinkCollectionActionEventData $data
     * @return int
     */
    protected function getLinkCollection(TokenInterface $token, GetLinkCollectionActionEventData $data) {
        return $this->hasRole('ROLE_USER', $token);
    }


    /**
     * @param TokenInterface $token
     * @param PostActionEventData $data
     * @return int
     */
    protected function post(TokenInterface $token, PostActionEventData $data) {
        return $this->hasRole('ROLE_ADMIN', $token);
    }

    /**
     * @param TokenInterface $token
     * @param PatchActionEventData $data
     * @return int
     */
    protected function patch(TokenInterface $token, PatchActionEventData $data) {
        return $this->grantOrDeny($data->getResource() === $token->getUser() || $this->hasRole('ROLE_ADMIN', $token));
    }

    /**
     * @param TokenInterface $token
     * @param PatchPropertyActionEventData $data
     * @return int
     */
    protected function patchProperty(TokenInterface $token, PatchPropertyActionEventData $data) {
        return $this->grantOrDeny($data->getResource() === $token->getUser() || $this->hasRole('ROLE_ADMIN', $token));
    }

    /**
     * @param TokenInterface $token
     * @param RemoveActionEventData $data
     * @return int
     */
    protected function remove(TokenInterface $token, RemoveActionEventData $data) {
        return $this->hasRole('ROLE_ADMIN', $token);
    }

    /**
     * @param TokenInterface $token
     * @param AddLinkActionEventData $data
     * @return int
     */
    protected function addLink(TokenInterface $token, AddLinkActionEventData $data) {
        return $this->grantOrDeny($data->getResource() === $token->getUser());
    }


    /**
     * @param TokenInterface $token
     * @param RemoveLinkActionEventData $data
     * @return int
     */
    protected function removeLink(TokenInterface $token, RemoveLinkActionEventData $data) {
        return $this->grantOrDeny($data->getResource() === $token->getUser());
    }

    
}