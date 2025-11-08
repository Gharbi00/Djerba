#!/bin/bash
echo "=== Pods ==="
kubectl get pods -n djerba
echo ""
echo "=== Services ==="
kubectl get svc -n djerba
echo ""
echo "=== Ingress ==="
kubectl get ingress -n djerba
