<?php

namespace BackendBundle;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class BackendBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        $container->addCompilerPass(new \Knp\JsonSchemaBundle\DependencyInjection\Compiler\RegisterJsonSchemasPass($this));
    }
}
