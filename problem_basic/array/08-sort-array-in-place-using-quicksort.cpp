#include <algorithm>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

// Problem: How to sort an array in place using QuickSort algorithm?
//
vector<int> merge(vector<int> left,vector<int> right){


    vector<int> result;

    for(int item:left){
        result.push_back(item);
    }
    for(int item:right){
        result.push_back(item);
    }

    return result;
}

void print(vector<int> v){
    for(int i:v){
        cout<<i<<" ";
    }
}


vector<int> performQuickSort(vector<int> &v){

    int n = v.size()-1;


    if(v.size() <=1){
        return v;
    }
    int pivotElement = v[n];

    vector<int> left;
    vector<int> right;


    for(int i =0;i<n;i++){
        int el = v[i];
        if (el < pivotElement) {
              left.push_back(el);
          } else {
              right.push_back(el);
          }
    }

    vector<int> leftEl = performQuickSort(left);
    vector<int> rightEl = performQuickSort(right);


    leftEl.push_back(pivotElement);

    return merge(leftEl, rightEl);

}

int partition(vector<int>& v, int low, int high){

    int pivot = v[high];
    int i=low-1;

    for(int j=low;j<high;j++){
        if(v[j]<=pivot){
            i++;
            swap(v[i],v[j]);
        }
    }
    swap(v[i + 1], v[high]);
    return i+1;
}

void inplaceQuickSort(vector<int>& v,int low,int high){

   if(low <high){
       int pi = partition(v,  low, high);

       inplaceQuickSort(v, low, pi-1);
       inplaceQuickSort(v, pi+1,high);
   }

}

int main() {
    vector<int> v={1,4,43,423,12,41231,123,12,12,5,54,2,1,22,1,5,78,43,2,4,3,6};

    cout<<endl;

    vector<int> result = performQuickSort(v);
    print(result);
    cout<<endl;

    inplaceQuickSort(v,0,v.size()-1);

    print(v);
    return 0;

}
