<?php
/**
 * Created by PhpStorm.
 * User: jascha
 * Date: 31.01.15
 * Time: 18:21
 */

namespace AppBundle\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\Role\Role;
use Symfony\Component\Security\Core\User\UserInterface;
use uebb\HateoasBundle\Entity\Resource;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Hateoas\Configuration\Annotation as Hateoas;

/**
 * Class User
 * @package AppBundle\Entity
 * @ORM\Entity
 * @Hateoas\RelationProvider("uebb.hateoas.relation_provider:addRelations")
 *
 * @Serializer\ExclusionPolicy("all")
 */
class User extends Resource implements UserInterface, \Serializable{

    public static function getQueryAbleProperties() {
        return array_merge(parent::getQueryAbleProperties(), array('username'));
    }
    /**
     * @var String
     * @ORM\Column(type="string")
     *
     * @Serializer\Expose
     */
    protected $username;

    /**
     * @var array
     * @ORM\Column(type="simple_array")
     *
     * @Serializer\Expose
     */
    protected $roles;

    /**
     * @ORM\ManyToMany(targetEntity="User", inversedBy="reverseContacts")
     *
     * @var ArrayCollection<User>
     */
    protected $contacts;

    /**
     * @var ArrayCollection<User>
     * @ORM\ManyToMany(targetEntity="User", mappedBy="contacts")
     */
    protected $reverseContacts;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="employees");
     */
    protected $employer;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="User", mappedBy="employer")
     */
    protected $employees;


    public function __construct()
    {
        $this->contacts = new ArrayCollection();
        $this->reverseContacts = new ArrayCollection();
        $this->employees = new ArrayCollection();
    }

    /**
     * (PHP 5 &gt;= 5.1.0)<br/>
     * String representation of object
     * @link http://php.net/manual/en/serializable.serialize.php
     * @return string the string representation of the object or null
     */
    public function serialize()
    {
        // TODO: Implement serialize() method.
    }

    /**
     * (PHP 5 &gt;= 5.1.0)<br/>
     * Constructs the object
     * @link http://php.net/manual/en/serializable.unserialize.php
     * @param string $serialized <p>
     * The string representation of the object.
     * </p>
     * @return void
     */
    public function unserialize($serialized)
    {
        // TODO: Implement unserialize() method.
    }

    /**
     * Returns the roles granted to the user.
     *
     * <code>
     * public function getRoles()
     * {
     *     return array('ROLE_USER');
     * }
     * </code>
     *
     * Alternatively, the roles might be stored on a ``roles`` property,
     * and populated in any number of different ways when the user object
     * is created.
     *
     * @return Role[] The user roles
     */
    public function getRoles()
    {
        // TODO: Implement getRoles() method.
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * This should be the encoded password. On authentication, a plain-text
     * password will be salted, encoded, and then compared to this value.
     *
     * @return string The password
     */
    public function getPassword()
    {
        // TODO: Implement getPassword() method.
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
        // TODO: Implement getSalt() method.
    }

    /**
     * Returns the username used to authenticate the user.
     *
     * @return string The username
     */
    public function getUsername()
    {
        // TODO: Implement getUsername() method.
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    /**
     * @param String $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @param array $roles
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;
    }

    /**
     * @return ArrayCollection
     */
    public function getContacts()
    {
        return $this->contacts;
    }

    /**
     * @param ArrayCollection $contacts
     */
    public function setContacts($contacts)
    {
        $this->contacts = $contacts;
    }

    public function addContact(User $user)
    {
        $this->contacts->add($user);
    }

    public function removeContact(User $user)
    {
        $this->contacts->remove($user);
    }

    /**
     * @return ArrayCollection
     */
    public function getReverseContacts()
    {
        return $this->reverseContacts;
    }

    /**
     * @param ArrayCollection $reverseContacts
     */
    public function setReverseContacts($reverseContacts)
    {
        $this->reverseContacts = $reverseContacts;
    }

    /**
     * @return User
     */
    public function getEmployer()
    {
        return $this->employer;
    }

    /**
     * @param User $employer
     */
    public function setEmployer($employer)
    {
        $this->employer = $employer;
    }

    /**
     * @return mixed
     */
    public function getEmployees()
    {
        return $this->employees;
    }

    /**
     * @param mixed $employees
     */
    public function setEmployees($employees)
    {
        $this->employees = $employees;
    }




}