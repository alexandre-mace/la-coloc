<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"task:read", "task"}},
 *     denormalizationContext={"groups"={"task:write", "task"}}
 * )
 * * @ORM\Entity(repositoryClass="App\Repository\TaskRepository")
 * @ApiFilter(BooleanFilter::class, properties={"done"})
 * @ApiFilter(OrderFilter::class, properties={"id"}, arguments={"orderParameterName"="order"})
 */
class Task
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"task"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"task"})
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"task"})
     */
    private $hardness;

    /**
     * @ORM\Column(type="boolean", options={"default" : 0})
     * @Groups({"task"})
     */
    private $done = false;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="createdTasks")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"task"})
     */
    private $createdBy;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getHardness(): ?int
    {
        return $this->hardness;
    }

    public function setHardness(int $hardness): self
    {
        $this->hardness = $hardness;

        return $this;
    }

    public function getDone(): ?bool
    {
        return $this->done;
    }

    public function setDone(bool $done): self
    {
        $this->done = $done;

        return $this;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $createdBy): self
    {
        $this->createdBy = $createdBy;

        return $this;
    }
}
